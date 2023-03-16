import { css, SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	neutral,
	palette,
	space,
	success,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	SvgChevronDownSingle,
	SvgChevronUpSingle,
	SvgTickRound,
} from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { MessageUsFieldType } from '../../../src/types/content';
import { decidePalette } from '../lib/decidePalette';
import { FormField } from './Callout/FormField';

const containerStyles = (format: ArticleFormat) => css`
	${until.desktop} {
		background-color: ${decidePalette(format).background.messageForm};
		color: white;
	}
	background-color: ${neutral[86]};
	padding: 12px;
`;
const textStyles = css`
	${textSans.xsmall()};
	padding-bottom: 16px;
`;

const successStyles = css`
	${textSans.xsmall()};
	color: white;
`;

const tickBoxStyles = css`
	fill: ${success[400]};
	width: 48px;
	margin-left: -8px;
`;
const errorTextStyles = css`
	color: ${palette.error[400]};
	${textSans.medium({ fontWeight: 'bold' })};
	display: flex;
`;

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const formFieldWrapperStyles = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${space[4]}px;
	${until.desktop} {
		label > div,
		label > div > span {
			color: white;
		}
	}
`;

const submitButtonStyles = css`
	${until.phablet} {
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	${until.desktop} {
		align-self: flex-start;
		background-color: white;
		color: black;
	}
	background-color: ${neutral[7]};
	align-self: center;
`;

const footerPaddingStyles = css`
	display: flex;
	flex-direction: row;
	${until.desktop} {
		justify-content: flex-start;
	}
	justify-content: space-around;
	padding-bottom: ${space[4]}px;
`;

const prefaceStyles = css`
	${textSans.xsmall()};
	color: 'white';
	padding-bottom: 16px;
`;

type FormDataType = { [key in string]: any };

type FormProps = {
	formFields: MessageUsFieldType[];
	submissionURL: string;
	formId: string;
	format: ArticleFormat;
	pageId: string;
};

export const Form = ({
	formFields,
	submissionURL,
	formId,
	format,
	pageId,
}: FormProps) => {
	const [formData, setFormData] = useState<FormDataType>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

	const [networkError, setNetworkError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [twitterHandle, setTwitterHandle] = useState('');

	const setFieldInFormData = (
		id: string,
		data: string | string[] | undefined,
	): void => {
		const currentErrors = validationErrors;
		currentErrors[id] = '';
		setValidationErrors(currentErrors);

		setFormData({
			...formData,
			[id]: data,
		});
	};

	const validateForm = (): boolean => {
		const errors: { [key in string]: string } = {};
		let isValid = true;
		formFields.forEach((field: MessageUsFieldType) => {
			if (field.required && !formData[field.id]) {
				errors[field.id] = 'This field is required';
				isValid = false;
			}
			if (field.type === 'email' && formData[field.id]) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid email address';
					isValid = false;
				}
			}
			if (['number', 'phone'].includes(field.id) && formData[field.id]) {
				const numberRegex = /^[\d ()+-]+$/;
				if (!numberRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid number';
					isValid = false;
				}
				const noWhiteSpace = formData[field.id] as string;
				if (noWhiteSpace.length < 10) {
					errors[field.id] = 'Please include your dialling/area code';
					isValid = false;
				}
				// should we have checks here for min length and max length?
			}
			return isValid;
		});
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const submitForm = async (form: FormDataType) => {
		setNetworkError('');

		if (formData.twitterHandle) {
			setNetworkError('Sorry we think you are a robot.');
			return;
		}
		// need to add prefix `field_` to all keys in form, required by formstack
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: form[cur],
			}),
			{},
		);
		return fetch(submissionURL, {
			method: 'POST',
			body: JSON.stringify({
				formId: formId,
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					setSubmissionSuccess(true);
				} else {
					setNetworkError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch((respError) => {
				window.guardian.modules.sentry.reportError(
					respError,
					'message-us-submission',
				);

				setNetworkError(
					'Sorry, there was a problem submitting your message. Please try again later.',
				);
			});
	};

	if (submissionSuccess) {
		return (
			<div css={containerStyles(format)}>
				<div css={tickBoxStyles}>
					<SvgTickRound />
				</div>
				<div css={successStyles}>
					Thank you for submitting your message.
				</div>
			</div>
		);
	}

	return (
		<div css={containerStyles(format)}>
			<div css={prefaceStyles}>
				<span css={{ fontWeight: 'bold' }}>Please note: </span>This is
				not a public comment – only the Guardian can see your message.
				Our writers will monitor these messages and respond to some in
				this live blog, but unfortunately they will not be able to
				respond to every message.
			</div>
			<form
				action="/formstack-campaign/submit"
				method="post"
				css={formStyles}
				noValidate={true}
				onSubmit={(e) => {
					e.preventDefault();
					const isValid = validateForm();
					if (!isValid) {
						const firstInvalidFormElement: HTMLInputElement =
							document.querySelectorAll(
								':invalid',
							)[1] as HTMLInputElement;
						firstInvalidFormElement.focus();
						return;
					}
					void submitForm(formData);
				}}
			>
				{Object.values(validationErrors).filter((err) => err !== '')
					.length > 0 && (
					<ErrorSummary
						message="Some information is missing."
						context="Please complete all required fields."
						cssOverrides={css`
							width: fit-content;
							width: 100%;
							margin-bottom: ${space[4]}px;
						`}
					/>
				)}
				{formFields.map((formField) => (
					<div css={formFieldWrapperStyles} key={formField.id}>
						<FormField
							formField={formField}
							formData={formData}
							setFieldInFormData={setFieldInFormData}
							validationErrors={validationErrors}
							pageId={pageId}
						/>
					</div>
				))}
				<div css={textStyles}>
					You must be 18 or over to fill in this form. We will only
					use this data for the purpose of improving our live blogs.
					For more information please read our terms of service and
					privacy policy. If you have something sensitive to share
					with us, contact the Guardian securely. By submitting your
					message, you are agreeing to share your details with us,
					which we may use in this blog.
				</div>
				{/* this element is a H O N £ Y - P 0 T */}
				<div
					css={css`
						position: absolute;
						left: -62.5rem;
					`}
					aria-hidden="true"
				>
					<input
						name="twitter-handle"
						type="text"
						id="twitter-handle"
						tabIndex={-1}
						placeholder="@mytwitterhandle"
						value={twitterHandle}
						onChange={(e) => setTwitterHandle(e.target.value)}
					/>
				</div>
				{!!networkError && (
					<div css={errorTextStyles}>{networkError}</div>
				)}
				<div css={footerPaddingStyles}>
					<Button type="submit" cssOverrides={submitButtonStyles}>
						Send to the Guardian
					</Button>
				</div>
			</form>
		</div>
	);
};

const detailsStyles: SerializedStyles = css`
	&:not([open]) .is-open,
	&[open] .is-closed {
		display: none;
	}

	&[open] summary {
		text-decoration: underline;
	}

	/* removes toggle triangle from webkit browsers such as Safari */
	summary::-webkit-details-marker {
		display: none;
	}
`;

const summaryStyles = css`
	cursor: pointer;
	&:focus {
		${focusHalo};
	}
	path {
		${until.desktop} {
			fill: white;
		}
	}
	svg {
		height: 12px;
	}
	${textSans.small({ fontWeight: 'bold' })};
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	${until.desktop} {
		color: white;
	}
`;

const popOutStyles = css`
	height: 18px;
	width: 18px;
	${until.desktop} {
		background-color: white;
	}
	background-color: black;
	border-radius: 9px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 4px;
	svg {
		height: 8px;
	}
`;

export const SendAMessage = ({
	formFields,
	submissionURL,
	formId,
	format,
	pageId,
}: FormProps) => {
	return (
		<details css={detailsStyles}>
			<summary css={summaryStyles}>
				<div css={popOutStyles}>
					{/* needs svg importing to source */}
				</div>
				Send us a message
				<span className="is-open">
					<SvgChevronUpSingle size="xsmall" />
				</span>
				<span className="is-closed">
					<SvgChevronDownSingle size="xsmall" />
				</span>
			</summary>
			<Form
				formFields={formFields}
				submissionURL={submissionURL}
				formId={formId}
				format={format}
				pageId={pageId}
			/>
		</details>
	);
};

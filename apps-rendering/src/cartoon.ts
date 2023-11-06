import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import type { Image as ImageData } from 'image/image';
import { Option, fromNullable, map } from '@guardian/types';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import { CartoonImage } from "@guardian/content-api-models/v1/cartoonImage";
import { ArticleElementRole } from "@guardian/libs";
import { ImageSubtype } from "image/image";
import { CartoonElementFields } from "@guardian/content-api-models/v1/cartoonElementFields";
import { Dpr, src, srcsets } from "./image/srcsets";

type VariantSize = "small" | "large"
const DEFAULT_VARIANT_SIZE: VariantSize = "small"

interface Cartoon {
	images: ImageData[];
	caption: Option<DocumentFragment>;
	nativeCaption: Option<string>;
	credit: Option<string>;
}

const parseCartoonImageSubtype = (cartoonImage: CartoonImage): Optional<ImageSubtype> => {
	switch (cartoonImage.mimeType) {
		case 'image/jpeg':
			return Optional.some(ImageSubtype.Jpeg);
		case 'image/png':
			return Optional.some(ImageSubtype.Png);
		case 'image/svg+xml':
			return Optional.some(ImageSubtype.Svg);
		default:
			return Optional.none();
	}
}

const parseCartoonImage = (cartoonImage: CartoonImage, salt: string, alt?: string): ImageData => {
	return {
		src: src(
			salt,
			cartoonImage.file,
			900,
			Dpr.One,
		),
		...srcsets(cartoonImage.file, salt),
		alt: fromNullable(alt),
		width: cartoonImage.width ?? 0,
		height: cartoonImage.height ?? 0,
		imageSubtype: parseCartoonImageSubtype(cartoonImage),
		role: ArticleElementRole.Standard,
	}
}

const parseCartoon =
	({ docParser, salt }: Context) =>
		(element: BlockElement): Optional<Cartoon> => {
			const data: CartoonElementFields | undefined = element.cartoonTypeData
			const images = (data?.variants ?? [])
				.find(v => v.viewportSize === DEFAULT_VARIANT_SIZE)
				?.images
				.map(img => parseCartoonImage(img, salt, data?.alt))
			const credit = data?.displayCredit ? data?.credit : undefined;

			return Optional.some({
				credit: fromNullable(credit),
				caption: map(docParser)(fromNullable(data?.caption)),
				nativeCaption: fromNullable(data?.caption),
				images: images ?? []
			});
		};

export { Cartoon, parseCartoon };

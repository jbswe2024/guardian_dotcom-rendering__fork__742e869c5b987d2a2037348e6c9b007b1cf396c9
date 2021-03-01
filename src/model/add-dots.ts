// Current fix for incorrect use of Middot

const transformDot = (html: string): string => {
	return html.replace(
		new RegExp('[•]', 'g'),
		'<span data-dcr-style="bullet"></span>',
	);
};

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.map((element, i) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			element.html.includes('•')
		) {
			if (elements.length - 1 === i) {
				enhanced.push({
					...element,
					html: `<footer>${transformDot(element.html)}</footer>`,
				});
			} else {
				enhanced.push({
					...element,
					html: element.html.replace(
						new RegExp('[•]', 'g'),
						'<span data-dcr-style="bullet"></span>',
					),
				});
			}
		} else {
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhancedDots = (data: CAPIType): CAPIType => {
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: checkForDots(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
		standfirst: transformDot(data.standfirst),
	} as CAPIType;
};

/* eslint-disable no-console -- Logs are useful for scripts */
const fs = require('fs');
const path = require('path');
const {
	getArticleSchema,
	getFrontSchema,
	getNewsletterPageSchema,
	getTagFrontSchema,
} = require('./get-schema');

const root = path.resolve(__dirname, '..', '..');

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();
const tagFrontSchema = getTagFrontSchema();
const newsletterPageSchema = getNewsletterPageSchema();

fs.writeFile(
	`${root}/src/model/article-schema.json`,
	articleSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/front-schema.json`,
	frontSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/tag-front-schema.json`,
	tagFrontSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/newsletter-page-schema.json`,
	newsletterPageSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

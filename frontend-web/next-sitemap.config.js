/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://antonio-troiano.de',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/admin', '/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://antonio-troiano.de/sitemap.xml',
        ],
    },
};

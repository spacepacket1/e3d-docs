/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.e3d.ai',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

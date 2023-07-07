module.exports = {
    siteUrl:process.env.WEBSITE_URL || "",
    generateRobotsTxt:false, 
    generateIndexSitemap:false,
    sitemapSize: 7000,
    exclude:["/state/*"],
    robotsTxtOptions:{
        policies:[
            { 
                userAgent:"*",
                allow:"/",
            }
        ]
    }
}
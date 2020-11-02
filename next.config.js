const path = require('path')

module.exports = _ => {
    const nextConfig = {
        target: 'serverless',

        webpack(config, options) {
            config.resolve.alias = {
                ...config.resolve.alias,

                libs: path.resolve(__dirname, 'libs/'),
                cfg: path.resolve(__dirname, "config.json")
            }

            return config
        },
    }

    return nextConfig
}
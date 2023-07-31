module.exports = {
    module: {
        rules: [
            {
                test: /\bmapbox-gl-csp-worker.js\b/i,
                use: { loader: 'worker-loader' }
            }
        ]
    },
    use: {
        loader: 'babel-loader',
        options: {
          ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
        }
    }
};
import {readFileSync} from 'fs';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8' ));

export default {
  entry: 'src/index.js',
  dest: 'dist/react-onsenui.js',
  plugins: [
    babel({
      presets: ['es2015-rollup', 'es2016', 'es2017', 'react', 'stage-3'],
      babelrc: false
    }),
    nodeResolve(),
    commonjs({
      'node_modules/react-dom/server.js': ['ReactDOMServer']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  external: [
    'react',
    'react-dom/server',
    'react-dom',
    'onsenui',
    'prop-types'
  ],
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOMServer',
    'onsenui': 'ons',
    'prop-types': 'PropTypes'
  },
  format: 'umd',
  moduleName: 'Ons',
  banner: `/*! ${pkg.name} v${pkg.version} - ${new Date()} */`,
  sourceMap: true
};

import ParcelBundler from 'parcel-bundler'

const bundler = new ParcelBundler('./test.spec.js')

bundler.on('buildStart', () => {})

bundler.bundle()

const bundler2 = new ParcelBundler('./test.spec.js')

bundler2.on('buildStart', () => {})

bundler2.bundle()
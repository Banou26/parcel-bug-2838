import ParcelBundler from 'parcel-bundler'

const bundler = new ParcelBundler('./test.spec.js')

bundler.bundle()

const bundler2 = new ParcelBundler('./test.spec.js')

bundler2.bundle()

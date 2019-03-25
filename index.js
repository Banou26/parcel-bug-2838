import { Observable, of, merge } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import ParcelBundler from 'parcel-bundler'

const observable =
  of(
    Observable.create(observer => {
      const bundler = new ParcelBundler('./test.spec.js', {
        target: 'browser',
        // hmr: false // Throw even more errors
      })
      
      bundler.on('buildStart', entryFiles  =>
        observer.next({ name: 'buildStart', entryFiles , buildStartTime: Date.now() }))

      bundler.bundle()
      return _ => bundler.stop()
    })
  ).pipe(
    mergeMap(( bundler ) =>
      merge(
          bundler.pipe(
            filter(({ name }) => name === 'buildStart')
          ),
          bundler.pipe(
            filter(({ name }) => name === 'bundled')
          )
      )
    )
  )

observable.subscribe(bundleWrapper => console.log(`\n\n${bundleWrapper.name}\n\n`))

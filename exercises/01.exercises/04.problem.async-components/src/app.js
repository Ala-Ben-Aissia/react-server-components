import { Fragment, createElement as h } from 'react'
import { shipDataStorage } from '../server/async-storage.js'
// 🐨 bring in ShipFallback here
import { ShipDetails } from './ship-details.js'
// 🐨 bring in SearchResultsFallback here
import { SearchResults } from './ship-search-results.js'

// 🐨 make this component async to signal to React this tree should be streamed
export function Document() {
	return h(
		'html',
		{ lang: 'en' },
		h(
			'head',
			null,
			h('meta', { charSet: 'utf-8' }),
			h('meta', {
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			}),
			h('title', null, 'Super Simple RSC'),
			h('link', { rel: 'stylesheet', href: '/style.css' }),
			h('link', {
				rel: 'shortcut icon',
				type: 'image/svg+xml',
				href: '/favicon.svg',
			}),
		),
		h('body', null, h('div', { className: 'app-wrapper' }, h(App))),
	)
}

function App() {
	const { shipId, search } = shipDataStorage.getStore()
	return h(
		'div',
		{ className: 'app' },
		h(
			'div',
			{ className: 'search' },
			h(
				Fragment,
				null,
				h(
					'form',
					null,
					h('input', {
						placeholder: 'Filter ships...',
						type: 'search',
						name: 'search',
						defaultValue: search,
						autoFocus: true,
					}),
				),
				h(
					'ul',
					null,
					// 🐨 wrap this in Suspense using h(SearchResultsFallback) as the fallback
					h(SearchResults),
				),
			),
		),
		h(
			'div',
			{ className: 'details' },
			shipId
				? // 🐨 wrap this in Suspense using h(ShipFallback) as the fallback
					h(ShipDetails)
				: h('p', null, 'Select a ship from the list to see details'),
		),
	)
}

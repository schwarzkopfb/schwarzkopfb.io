const DEFAULT_THEME = 'red'

import labels from '../../content/site'

const result = { menu: [] },
      { menu } = result,
      { title, tagline, content, pages, footer } = labels

let { theme } = labels

// fallback to default if not specified
theme = theme || DEFAULT_THEME

// extract default theme, title, tagline & content
result.theme = theme
result.title = title
result.tagline = tagline
result.content = content

// parse menu items & fetch related content
for (let [ key, value ] of Object.entries(pages)) {
    const item = { title, tagline, content }

    if (typeof value === 'object') {
        // fallback to item key if not specified
        var label = value.label || key,
            // fallback to main theme if not specified
            itemTheme = value.theme || theme,
            // destructure link from item descriptor object
            { link } = value

        // fallback to main title if not specified
        item.title = value.title || title
        // fallback to main tagline if not specified
        item.tagline = value.tagline || tagline

        // fetch page content
        // fallback to item key if not specified
        import(`../../content/pages/${value.content || key}`)
            .then(res => item.content = res.default) // todo: handle error
    }
    else {
        // not specified, so fallback to main theme
        itemTheme = theme
        label = key
        link = value

        // fetch page content
        import(`../../content/pages/${key}`)
            .then(res => item.content = res.default) // todo: handle error
    }

    item.theme = itemTheme
    item.label = label
    item.link = link

    menu.push(item)
}

// extract footer
result.footer = footer

export default result

import labels from '../../content/site'

const result = { pages: [] },
      { title, tagline, content, pages, footer } = labels

let { theme } = labels

// extract default title, tagline
result.title = title
result.tagline = tagline

// parse pages
for (let [ key, value ] of Object.entries(pages)) {
    const item = { title, tagline }
    let content = key,
        footer = true,
        itemTheme

    if (typeof value === 'object') {
        // fallback to item key if not specified
        var label = value.label || key,
            // destructure link from item descriptor object
            { link } = value

        // fallback to main theme if not specified
        itemTheme = value.theme || theme,

        // fallback to main title if not specified
        item.title = value.title || title
        // fallback to main tagline if not specified
        item.tagline = value.tagline || tagline

        // use content key from config if explicitly specified
        if ('content' in value)
            content = value.content

        if ('footer' in value)
            footer = value.footer
    }
    else {
        // not specified, so fallback to main theme
        itemTheme = theme
        label = key
        link = value
    }

    item.component = async () => {
        await import(`../style/theme/${itemTheme}.less`)
        return import(`../../content/pages/${content}.md`)
    }
    item.hidden = value.hidden
    item.footer = footer
    item.theme = itemTheme
    item.label = label
    item.link = link

    result.pages.push(item)
}

// extract footer
result.footer = footer

export default result

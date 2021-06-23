# Diluv Formatting Guide

Diluv uses a custom version of Markdown to apply formatting to text in certain places such as project descriptions and changelogs. Markdown is a simple format which uses special characters to denote formatting.

:::warning
Formatting behaviors that have not been defined within this guide should be avoided. They are not officially supported and may be removed or break in a future update to the website.
:::

## Text

There are many ways to format simple text. This can be done by surrounding the text you wish to format with the special format character. The format character will automatically be removed when the text is displayed. You can also mix and match multiple text formats together.

\*Italics Text\* -> _Italics Text_  
\*\*Bold Text\*\* -> **Bold Text**  
\_\_Underlined Text\_\_ -> __Underlined Text__  
\~\~Striked Text\~\~ -> ~~Striked Text~~  
\|\|Spoiler Text\|\| -> ||Spoiler Text||

### Combo Examples

\*\*\*Bold Italics\*\*\* -> **_Bold Italics_**  
\_\_\*\*Bold Underline\*\*\_\_ -> ****Bold Underline****  
\_\_\*\*\~\~Bold Underline Striked\~\~\*\*\_\_ -> __**~~Bold Underline Striked~~**__

## Escaping

In some cases you may want to keep the special character in your text and not use it for formatting. This can be done by "escaping" that character. To escape a character simply put a backslash `\` in front of it. For example `\*Ignoring Formatting Characters\*` becomes \*Ignoring Formatting Characters\*. You can also escape escape characters.

## Lists

To create a list simply write out your list using numbers, asterisks, or dashes to define each item in the list. Sub lists can also be defined by indenting with two spaces.

```
1. First
2. Second
3. Third

- egg
- milk
  - almond milk works too
  - Just not goat milk
- spaghetti
```

1. First
2. Second
3. Third

-   egg
-   milk
    -   almond milk works too
    -   Just not goat milk
-   spaghetti

## Images

You can include an image in your post by linking to it using the following format. We recommend including alternative text and a title with your image to make your description more accessible.

```
![A text based description of your image.](https://download.nodecdn.net/containers/diluvstaging/games/minecraft-je/logo.webp "A title.")
```

![A text based description of your image.](https://download.nodecdn.net/containers/diluvstaging/games/minecraft-je/logo.webp "A title.")

## Links

Including a URL in your post will make it automatically clickable. You can also use a special formatting to create hyperlinks with a display name.

```
[This is a link](https://www.diluv.com)
```

[This is a link](https://www.diluv.com)

## Quotes

You can define quotes by using the > character at the start of a line. Starting multiple lines will create bigger quotes.

```
> Hello world!

> This is two
> lines of quote.

> You can even nest quotes.
>> Hello world!
```

> Hello world!

> This is two  
> lines of quote.

> You can even nest quotes.
>
> > Hello world!

## Checkboxes

Checkboxes are a variant of list which allow you to indicate if something has been completed or not.

```
- [x] Milk the cow.
- [x] Milk the squid.
- [ ] Milk the ravager.
```

-   [x] Milk the cow.
-   [x] Milk the squid.
-   [ ] Milk the ravager.

## Tables

Tables allow you to organize your data into rows and columns.

```
| __1st__       | **2nd**     |     3rd       |
|:--------------|:------------|:--------------|
| Dirt Block    | Trapdoor    | Diamond Block |
| Netherite Hoe | Diamond Hoe | Golden Hoe    |
```

| __1st__       | **2nd**     | 3rd           |
| :------------ | :---------- | :------------ |
| Dirt Block    | Trapdoor    | Diamond Block |
| Netherite Hoe | Diamond Hoe | Golden Hoe    |

## Notices

You can create a notice by using the following syntax. We currently support `tip`, `warning`, `important`, `note`.

```
:::tip Your Title Here
This is a body which can include **markdown** formatting.
:::
```

:::tip{title="Your Title Here"}
This is a body which can include **markdown** formatting.
:::

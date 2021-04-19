# 🎉 vue-progress-circle-svg 🎉

>  A simple progress circle `svg` component made with [Vue.js 2](https://vuejs.org/v2/guide/).

___

## 👩🏻‍💻👨🏻‍💻 Installation

The module is published on [npmjs.org](https://www.npmjs.com/package/vue-progress-circle-svg).

```bash

# 1.
# cd your-project-folder

# 2.
npm i vue-progress-circle-svg

```

___

## Usage

### As component

```javascript

// In a .vue file
import progressCircle from 'vue-progress-circle-svg/dist/progress-circle.esm';

export default {
  components: {
    progressCircle,
  },
};


```

#### Other usages (Coming soon!):
- Global component + Install;
- As a global plugin;
- Dirctly inside your browser;

___

### `Props`

| Attribute | Type | Default value | About |
|:--------------------:|--------------------|:-------:|-------------------------------------|
| value | Number | 0 | `@model` The value for current progress |
| size | Number | 24 | Sets the diameter of the progress circle in pixels |
| startAngle | Number | 0 | Sets the starting sector angle, in radians |
| minValue | Number | 0 | Sets the minimum value needed to normalize the value range |
| maxValue | Number | 100 | Sets the maximum value needed to normalize the value range |
| svgClassName | String | '' | Sets the svg root tag class name |
| sectorClassName | String | '' | Sets the sector class name |
| sectorFill | String | '#5B85AA' | Sets the sector fill |
| sectorStroke | String | 'none' | Sets the sector stroke |
| sectorFillRule | String | 'evenodd' | Sets the sector fill rule |
| borderClassName | String | '' | Sets the border class name |
| borderFill | String | 'none' | Sets the sector fill |
| borderStroke | String | '#414770' | Sets the border stroke |
| svgCustomProps | Object | () => {} | Binds every property of the passed Object as props/attributes of the `svg` component |
| sectorCustomProps | Object | () => {} | Binds every property of the passed Object as props/attributes of the sector `path` tag |
| circleCustomProps | Object | () => {} | Binds every property of the passed Object as props/attributes of the `circle` tag |

___

## 🐞 Issues / 📝 Discussions / 👥 Contribution

This is my first package, and a first step to the OSS world.

Feel free to open `issues`, make suggest stuff opening a `discussion` or `Contribute`.

Thanks for using this component 💘.

___

## 🆓 License

[MIT License](./LICENSE) // Copyright (©) 2021-now [Gianluca Bianco](https://gianlucabianco.dev/)
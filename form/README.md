# @jeremiemeunier/form

## Aperçu

Bibliothèque complète de champs et formulaires réutilisables (inputs, selecteurs, date pickers, soumissions…). Elle s’appuie sur `@jeremiemeunier/core` pour les styles et composants transverses.

## Installation

1. Ajoutez un fichier `.npmrc` à la racine de votre projet :
   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```
2. Installez les packages requis :
   ```bash
   npm install @jeremiemeunier/core @jeremiemeunier/form
   ```
3. Importez les composants nécessaires dans votre application :
   ```tsx
   import { Input, Select, Submit } from "@jeremiemeunier/form";
   ```

## Scripts npm

| Commande          | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm run lint`    | Analyse statique avec ESLint.                                                |
| `npm run build`   | Compile la bibliothèque avec tsup et publie les artefacts dans `dist/`.      |
| `npm run pub`     | Construit puis publie la version courante sur GitHub Packages.               |
| `npm run pubbeta` | Variante de publication qui publie la version courante avec le tag `beta`.   |

## Développement local

```bash
npm install
npm run lint
npm run build
# npm run pub      # publication stable (connexion à GitHub Packages requise)
# npm run pubbeta  # publication d'une préversion
```

## Tests

Ce package ne fournit pas encore de suite de tests automatisés.

## Utilisation rapide

Le package est déjà compilé et publié, aucune étape de build supplémentaire n'est requise pour la consommation depuis un projet React. Après l’installation, importez simplement le composant souhaité :

```tsx
import { Form, Input, Submit } from "@jeremiemeunier/form";
```

## Composants disponibles

- [`<Adress>`](#adress)
- [`<AutoComplete>`](#autocomplete)
- [`<Checkbox>`](#checkbox)
- [`<CheckboxSlider>`](#checkboxslider)
- [`<DatePicker>`](#datepicker)
- [`<DragAndDrop>`](#draganddrop)
- [`<FileInput>`](#fileinput)
- [`<Form>`](#form)
- [`<Group>`](#group)
- [`<Input>`](#input)
- [`<Message>`](#message)
- [`<Password>`](#password)
- [`<Progress>`](#progress)
- [`<Radio>`](#radio)
- [`<Select>`](#select)
- [`<Submit>`](#submit)
- [`<TagInput>`](#taginput)
- [`<TextArea>`](#textarea)
- [`<TotpInput>`](#totpinput)

## Props settings

| Props name    | Required | Type          | Default | Components     |
| ------------- | -------- | ------------- | :-----: | -------------- |
| `label`       | optional | String        |         | all            |
| `content`     | required | ReactState    |         | all            |
| `setContent`  | required | ReactSetState |         | all            |
| `error`       | optional | ReactState    |         | all            |
| `size`        | optional | Integer       |         | all            |
| `readOnly`    | optional | Boolean       |         | all            |
| `tagline`     | optional | Object        |         | all            |
| `otherAction` | optional | Object        |         | `Submit`       |
| `type`        | optional | String        | `text`  | all            |
| `maxLength`   | optional | Integer       |         | all            |
| `placeHolder` | optional | String        |         | all            |
| `locked`      | optional | Boolean       |         | all            |
| `regex`       | optional | RegexPattern  |         | all            |
| `regexLabel`  | optional | String        |         | all            |
| `required`    | optional | Boolean       |         | all            |
| `name`        | optional | String        |         | all            |
| `accept`      | required | Array         |         | `FileInput`    |
| `isNew`       | optional | Boolean       |         | `Password`     |
| `rows`        | optional | Integer       |         | `TextArea`     |
| `data`        | required | Object        |         | `AutoComplete` |
| `values`      | required | Object        |         | `Radio`        |
| `blockedDate` | optional | Object        |         | `DatePicker`   |

## All inputs components

### Select

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Select
  label={"My select label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  locked={true|false}>
  <option>my select option</option>
  <option>my select option</option>
  <option>my select option</option>
  <option>my select option</option>
  <option>my select option</option>
</Select>
```

### Input

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Input
  label={"My input label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  type={"url"|"text"|"mail"|...}
  maxLength={integer}
  placeHolder={"My input placeholder"}
  locked={true|false}
  regex={regexPattern}
  regexLabel={"My error text for regex"}
  required={true|false}
  name={optional: "my_input_name"} />
```

For `type` props see [`<input>` : The Input (Form Input) element](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input#les_diff%C3%A9rents_types_de_champs_input)

### FileInput

Vous devez utiliser un `FormData` et ajouter `enctype="multipart/form-data"` lors de l'utilisation de ce composant.

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<FileInput
  label={"My file input label"}
  setContent={setContent}
  error={error}
  size={integer}
  required={true|false}
  accept={["jpg", "xlsx", ...]} />
```

### Password

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Password
  label={"My password input label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  maxLength={integer}
  placeHolder={"My input placeholder"}
  locked={true|false}
  regex={regexPattern}
  regexLabel={"My error text for regex"}
  required={true|false}
  name={optional: "my_input_name"}
  isNew={true|false} />
```

### TextArea

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<TextArea
  label={"My textarea label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  maxLength={integer}
  placeHolder={"My textarea placeholder"}
  locked={true|false}
  regex={regexPattern}
  regexLabel={"My error text for regex"}
  required={true|false}
  name={optional: "my_input_name"}
  rows={optional: integer} />
```

### Message

```jsx
<Message
  label={"My message label"}
  content={"Message content"}
  size={integer}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  type={"info"|"danger"|"warning"} />
```

### Checkbox

```jsx
const [content, setContent] = useState(true|false);
const [error, setError] = useState("");

...

<Checkbox
  label={"My checkbox label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  required={true|false}
  name={optional: "my_checkbox_name"} />
```

### CheckboxSlider

```jsx
const [content, setContent] = useState(true|false);
const [error, setError] = useState("");

...

<CheckboxSlider
  label={"My checkbox slider label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  required={true|false}
  name={optional: "my_checkbox_slider_name"} />
```

### Radio

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Radio
  label={"My radio label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  values={{
    valueKey: "Value"
  }}
  required={true|false}
  name={optional: "my_radio_name"} />
```

### Group

```jsx
const [content, setContent] = useState({
  selectKey: "selectValue",
  inputKey: "inputValue"
});
const [error, setError] = useState({
  selectKey: "",
  inputKey: ""
});

...

<Group
  label={"My group label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_group_name"}>
  <Select
    label={"My select label"}
    content={content.selectKey}
    setContent={(value) => setContent({
      ...content,
      selectKey: value
    })}
    error={error.selectKey}
    size={integer}
    readOnly={true|false}
    tagline={{
      "link": "https://digitalteacompany.fr",
      "label": "DigitalTeacompany"
    }}
    locked={true|false}
    required={true|false}
    name={optional: "my_select_name"}>
    <option>my select option</option>
    <option>my select option</option>
    <option>my select option</option>
    <option>my select option</option>
    <option>my select option</option>
  </Select>
  <Input
    label={"My input label"}
    content={content.inputKey}
    setContent={(value) => setContent({
      ...content,
      inputKey: value
    })}
    error={error.inputKey}
    size={integer}
    readOnly={true|false}
    tagline={{
      "link": "https://digitalteacompany.fr",
      "label": "DigitalTeacompany"
    }}
    locked={true|false}
    required={true|false}
    name={optional: "my_input_name"} />
</Group>
```

### Form

```jsx
const [content, setContent] = useState({
  inputKey: "",
  selectKey: ""
});
const [error, setError] = useState({
  inputKey: "",
  selectKey: ""
});

...

const mySubmitHandler = (event) => {
  event.preventDefault();

  ...
};

const myErrorHandler = (event) => {
  event.preventDefault();

  ...
};

<Form
  content={content}
  setContent={setContent}
  error={error}
  setError={setError}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  submit={{
    "label": "My submit button label",
    "action": mySubmitHandler,
    "appearance": "primary"
  }}
  otherAction={{
    "label": "My other button label",
    "action": myErrorHandler,
    "appearance": "secondary"
  }}
  locked={true|false}
  name={optional: "my_form_name"}>
  <Input ... />
  <Select ... />
  <Checkbox ... />
  <CheckboxSlider ... />
  <Radio ... />
</Form>
```

### Progress

```jsx
const [content, setContent] = useState(0);
const [error, setError] = useState("");

...

<Progress
  label={"My progress label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  required={true|false}
  name={optional: "my_progress_name"} />
```

### Submit

```jsx
const mySubmitHandler = (event) => {
  event.preventDefault();

  ...
};

<Submit
  label={"My submit button label"}
  action={mySubmitHandler}
  appearance={"primary"}
  locked={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }} />
```

### DragAndDrop

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<DragAndDrop
  label={"My drag and drop label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_drag_and_drop_name"} />
```

### TagInput

```jsx
const [content, setContent] = useState(["Tag 1", "Tag 2"]);
const [error, setError] = useState("");

...

<TagInput
  label={"My tag input label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_tag_input_name"} />
```

### TotpInput

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<TotpInput
  label={"My TOTP input label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_totp_input_name"} />
```

### DatePicker

```jsx
const [content, setContent] = useState(new Date());
const [error, setError] = useState("");

...

<DatePicker
  label={"My date picker label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_date_picker_name"}
  blockedDate={{
    type: "array",
    values: ["2023-01-01", "2023-01-02"]
  }} />
```

### AutoComplete

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

const data = [
  {
    value: "FR",
    label: "France"
  },
  {
    value: "DE",
    label: "Allemagne"
  }
];

...

<AutoComplete
  label={"My autocomplete label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_autocomplete_name"}
  data={data} />
```

### Adress

```jsx
const [content, setContent] = useState({
  address: "",
  city: "",
  zip: ""
});
const [error, setError] = useState({
  address: "",
  city: "",
  zip: ""
});

...

<Adress
  label={"My adress label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  locked={true|false}
  required={true|false}
  name={optional: "my_adress_name"} />
```

### FileInput drop zone

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<FileInput
  label={"My file input label"}
  setContent={setContent}
  error={error}
  size={integer}
  required={true|false}
  accept={["jpg", "xlsx", ...]}
  dropZone={true|false} />
```

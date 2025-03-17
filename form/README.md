# @jeremiemeunier/form

## All components

- [`<Select>`](#select)
- [`<Input>`](#input)
- [`<FileInput>`](#fileinput)
- [`<Password>`](#password)
- [`<TextArea>`](#textarea)
- [`<Checkbox>`](#checkbox)
- [`<Submit>`](#submit)
- [`<AutoComplete>`](#autocomplete)
- [`<Message>`](#message)
- [`<Radio>`](#radio)
- [`<DatePicker>`](#datepicker)

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
| `type`        | optional | Noolean       | `text`  | all            |
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

For `type` props see [`<input>` : The Input (Form Input) element](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input#les_différents_types_de_champs_input)

### FileInput

You must use a `FormData` and `enctype="multipart/formdata` with use this components.

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
  isNew={true|false}
  placeHolder={"My password placeholder"}
  locked={true|false} />
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
  maxLength={integer}
  error={error}
  size={integer}
  tagline={{
    "link": "https://digitalteacompany.fr",
    "label": "DigitalTeacompany"
  }}
  readOnly={true|false}
  placeHolder={"My textarea placeholder"}
  locked={true|false}
  rows={integer} />
```

### Checkbox

If a specific `value` is passed, on check the component return in `setContent` the value else `Checkbox` return a boolean.

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Checkbox
  error={error}
  value={optional: "a_specific_value"}
  content={content}
  setContent={setContent}
  locked={true|false}>
  My checkbox label
</Checkbox>
```

### Submit

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");

...

<Submit
  size={integer}
  format={true|false}
  label={"My submit button label"}
  otherAction={{
    "link": "",
    "icon": "",
    "iconHide": true|false,
    "visible": true|false,
    "label": ""
  }}
  loading
  locked />
```

### AutoComplete

```jsx
const [content, setContent] = useState("");
const [error, setError] = useState("");
const data = [
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "", value: "" },
  { label: "", value: "" }
];

...

<AutoComplete
  label={"My autocomplete label"}
  content={content}
  setContent={setContent}
  error={error}
  size={integer}
  readOnly={true|false}
  maxLength={integer}
  placeHolder={"My autocomplete placeholder"}
  locked={true|false}
  data={data}
  required={true|false} />
```

### Message

```jsx
const data = {
  type: "negative|positive|main",
  content: "My message content text"
};

...

<Message data={data} />
```

### Radio

```jsx
const data = [
  { id: "8", label: "08:00" },
  { id: "9", label: "09:00" },
  { id: "10", label: "10:00" },
  { id: "11", label: "11:00", disabled: true },
  { id: "14", label: "14:00", disabled: true },
  { id: "15", label: "15:00", disabled: true },
  { id: "16", label: "16:00" },
  { id: "17", label: "17:00" },
];

...

<Radio values={data} />
```

### DatePicker

```jsx
<DatePicker
  disabled="weekend"
  content={count}
  setContent={setCount}
  error={error}
  blockedDate={[
    "2024-05-23",
    "2024-05-20",
    "2024-05-21",
    "2024-05-22",
    "2024-05-31",
  ]}
  disabled={["sunday", "wednesday"]}
/>
```

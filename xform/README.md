# @jeremiemeunier/x-form

## Overview

**@jeremiemeunier/x-form** is a FormData-focused fork of the form components from `@jeremiemeunier/form`. This package is specifically designed to work exclusively with the `FormData` API, making it ideal for applications that need to handle file uploads, multipart form data, or prefer server-side form processing.

### Key Differences from @jeremiemeunier/form

- **FormData-Only**: All components are designed to work with native FormData extraction
- **No State Management**: Components use uncontrolled inputs with `defaultValue` instead of controlled state
- **Simplified API**: Automatic FormData handling removes the need for manual state management
- **Native HTML**: Leverages native HTML form behavior for better performance and compatibility
- **File Upload Ready**: All forms automatically include `enctype="multipart/form-data"`

## Installation

1. Add a `.npmrc` file at the root of your project:
   ```npmrc
   @jeremiemeunier:registry=https://npm.pkg.github.com
   ```

2. Install the required packages:
   ```bash
   npm install @jeremiemeunier/core @jeremiemeunier/x-form
   ```

3. Import the components in your application:
   ```tsx
   import { XForm, XInput, XSubmit } from "@jeremiemeunier/x-form";
   ```

## Scripts

| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `npm run lint`    | Static analysis with ESLint                                       |
| `npm run build`   | Build the library with tsup and output artifacts to `dist/`      |
| `npm run pub`     | Build and publish the current version to GitHub Packages          |
| `npm run pubbeta` | Build and publish the current version with the `beta` tag         |

## Local Development

```bash
npm install
npm run lint
npm run build
# npm run pub      # stable release (requires GitHub Packages authentication)
# npm run pubbeta  # prerelease version
```

## Basic Usage

### Simple Form Example

```tsx
import { XForm, XInput, XTextArea, XSubmit } from "@jeremiemeunier/x-form";

function MyForm() {
  const handleSubmit = (formData: FormData) => {
    // Access form data directly
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    console.log({ name, email, message });
    
    // Or send it directly to an API
    fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <XForm onSubmit={handleSubmit}>
      <XInput
        name="name"
        label="Name"
        placeholder="Enter your name"
        required
      />
      <XInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <XTextArea
        name="message"
        label="Message"
        placeholder="Enter your message"
        rows={5}
        required
      />
      <XSubmit label="Send Message" />
    </XForm>
  );
}
```

### File Upload Example

```tsx
import { XForm, XInput, XSubmit } from "@jeremiemeunier/x-form";

function FileUploadForm() {
  const handleSubmit = (formData: FormData) => {
    // Files are automatically included in FormData
    const file = formData.get("document");
    
    fetch("/api/upload", {
      method: "POST",
      body: formData, // Includes the file with proper encoding
    });
  };

  return (
    <XForm onSubmit={handleSubmit}>
      <XInput
        name="title"
        label="Document Title"
        required
      />
      <XInput
        name="document"
        label="Upload Document"
        type="file"
        required
      />
      <XSubmit label="Upload" />
    </XForm>
  );
}
```

## Available Components

### XForm

The main form wrapper that automatically handles FormData extraction.

**Props:**
- `onSubmit: (formData: FormData, event: FormEvent) => void` - Form submission handler
- `className?: string` - Additional CSS classes
- `children: React.ReactNode` - Form elements

**Example:**
```tsx
<XForm onSubmit={(formData) => console.log(formData)}>
  {/* Form fields */}
</XForm>
```

### XInput

FormData-compatible input field for text, email, numbers, files, etc.

**Props:**
- `name: string` - Field name (required for FormData)
- `label?: string` - Input label
- `type?: string` - HTML input type (default: "text")
- `placeholder?: string` - Placeholder text
- `defaultValue?: string | number` - Default value
- `required?: boolean` - Make field required
- `disabled?: boolean` - Disable the input
- `maxLength?: number` - Maximum character length
- `min?: number` - Minimum value (for number/date inputs)
- `max?: number` - Maximum value (for number/date inputs)
- `step?: number` - Step value (for number inputs)
- `size?: number` - Grid size (1-12)
- `error?: string` - Error message to display

**Example:**
```tsx
<XInput
  name="email"
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  required
/>
```

### XTextArea

FormData-compatible textarea field.

**Props:**
- `name: string` - Field name (required)
- `label?: string` - Textarea label
- `placeholder?: string` - Placeholder text
- `defaultValue?: string` - Default value
- `required?: boolean` - Make field required
- `disabled?: boolean` - Disable the textarea
- `rows?: number` - Number of visible text rows
- `maxLength?: number` - Maximum character length
- `error?: string` - Error message to display

**Example:**
```tsx
<XTextArea
  name="description"
  label="Description"
  rows={5}
  maxLength={500}
  required
/>
```

### XSelect

FormData-compatible select dropdown.

**Props:**
- `name: string` - Field name (required)
- `label?: string` - Select label
- `defaultValue?: string` - Default selected value
- `required?: boolean` - Make field required
- `disabled?: boolean` - Disable the select
- `error?: string` - Error message to display
- `children: React.ReactNode` - Option elements

**Example:**
```tsx
<XSelect name="country" label="Country" required>
  <option value="">Select a country</option>
  <option value="FR">France</option>
  <option value="DE">Germany</option>
  <option value="US">United States</option>
</XSelect>
```

### XCheckbox

FormData-compatible checkbox field.

**Props:**
- `name: string` - Field name (required)
- `label?: string` - Checkbox label
- `value?: string` - Value when checked (default: "on")
- `defaultChecked?: boolean` - Initially checked state
- `disabled?: boolean` - Disable the checkbox
- `error?: string` - Error message to display
- `children?: React.ReactNode` - Label content

**Example:**
```tsx
<XCheckbox name="terms" value="accepted" required>
  I agree to the terms and conditions
</XCheckbox>
```

### XRadio

FormData-compatible radio button group.

**Props:**
- `name: string` - Field name (required, same for all options in group)
- `label?: string` - Group label
- `options: Array<{value: string, label: string}>` - Radio options
- `defaultValue?: string` - Default selected value
- `required?: boolean` - Make selection required
- `disabled?: boolean` - Disable all radio buttons
- `gridSize?: number` - Grid columns for layout (default: 2)
- `error?: string` - Error message to display

**Example:**
```tsx
<XRadio
  name="plan"
  label="Select a plan"
  options={[
    { value: "free", label: "Free Plan" },
    { value: "pro", label: "Pro Plan" },
    { value: "enterprise", label: "Enterprise Plan" },
  ]}
  defaultValue="free"
  required
/>
```

### XSubmit

Submit button component.

**Props:**
- `label?: string` - Button label
- `disabled?: boolean` - Disable the button
- `appearance?: "primary" | "secondary" | "danger"` - Button style
- `className?: string` - Additional CSS classes
- `children?: React.ReactNode` - Button content

**Example:**
```tsx
<XSubmit label="Submit Form" appearance="primary" />
```

## Working with FormData

FormData provides a powerful API for working with form data:

```tsx
const handleSubmit = (formData: FormData) => {
  // Get a single value
  const name = formData.get("name");
  
  // Get all values for a name (useful for multiple checkboxes)
  const interests = formData.getAll("interests");
  
  // Check if a field exists
  if (formData.has("email")) {
    const email = formData.get("email");
  }
  
  // Iterate over all entries
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  
  // Convert to object (simple fields only)
  const data = Object.fromEntries(formData.entries());
  
  // Send to API
  fetch("/api/endpoint", {
    method: "POST",
    body: formData, // Automatically sets correct headers
  });
};
```

## Migration from @jeremiemeunier/form

If you're migrating from the stateful `@jeremiemeunier/form` package:

**Before:**
```tsx
const [content, setContent] = useState({ value: "", error: false, message: "" });

<Input
  name="email"
  content={content}
  setContent={setContent}
/>
```

**After:**
```tsx
<XInput
  name="email"
  defaultValue=""
/>
```

The form submission handler receives FormData instead of accessing state:

**Before:**
```tsx
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(content.value);
};
```

**After:**
```tsx
const handleSubmit = (formData) => {
  // Event already prevented by XForm
  console.log(formData.get("email"));
};
```

## Styling

All components use the same CSS classes as `@jeremiemeunier/form`, ensuring visual consistency:

- `windmillui-form` - Form container
- `windmillui-form-container` - Field container
- `windmillui-input` - Input wrapper
- `windmillui-checkbox` - Checkbox wrapper
- `windmillui-radio` - Radio button wrapper
- `windmillui-button` - Button styles

Make sure to include the core styles from `@jeremiemeunier/core`.

## Benefits of FormData Approach

1. **Simpler Code**: No state management needed for form fields
2. **Better Performance**: Uncontrolled components are faster
3. **File Upload Support**: Native file handling without extra libraries
4. **Server-Side Friendly**: FormData works seamlessly with server endpoints
5. **Progressive Enhancement**: Works even if JavaScript fails
6. **Less Boilerplate**: No need for onChange handlers and state updates

## Browser Support

FormData is supported in all modern browsers. For legacy browser support, consider using a polyfill.

## License

ISC

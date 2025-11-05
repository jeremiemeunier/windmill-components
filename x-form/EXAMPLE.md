# @jeremiemeunier/x-form - Examples

This file contains practical examples of using the x-form components.

## Complete Contact Form Example

```tsx
import React from "react";
import {
  XForm,
  XInput,
  XTextArea,
  XSelect,
  XCheckbox,
  XSubmit,
} from "@jeremiemeunier/x-form";

function ContactForm() {
  const handleSubmit = (formData: FormData, event) => {
    // FormData automatically contains all form field values
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      newsletter: formData.get("newsletter") === "on",
    };

    console.log("Form data:", data);

    // Send to API
    fetch("/api/contact", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        event.currentTarget.reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <XForm onSubmit={handleSubmit}>
      <XInput
        name="name"
        label="Full Name"
        placeholder="John Doe"
        required
        maxLength={100}
      />

      <XInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
      />

      <XSelect name="subject" label="Subject" required>
        <option value="">Select a subject</option>
        <option value="general">General Inquiry</option>
        <option value="support">Technical Support</option>
        <option value="sales">Sales Question</option>
        <option value="other">Other</option>
      </XSelect>

      <XTextArea
        name="message"
        label="Your Message"
        placeholder="Tell us what's on your mind..."
        rows={6}
        required
        maxLength={1000}
      />

      <XCheckbox name="newsletter" value="subscribed">
        Subscribe to our newsletter
      </XCheckbox>

      <XSubmit label="Send Message" appearance="primary" />
    </XForm>
  );
}

export default ContactForm;
```

## File Upload Form Example

```tsx
import React, { useState } from "react";
import {
  XForm,
  XInput,
  XTextArea,
  XSubmit,
} from "@jeremiemeunier/x-form";

function DocumentUploadForm() {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);

    try {
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData, // Files are automatically included
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Document uploaded:", result);
        alert("Document uploaded successfully!");
      } else {
        console.error("Upload failed");
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <XForm onSubmit={handleSubmit}>
      <XInput
        name="title"
        label="Document Title"
        placeholder="Enter document title"
        required
        maxLength={200}
      />

      <XTextArea
        name="description"
        label="Description"
        placeholder="Brief description of the document"
        rows={4}
      />

      <XInput
        name="document"
        label="Select Document"
        type="file"
        required
      />

      <XSubmit
        label={uploading ? "Uploading..." : "Upload Document"}
        disabled={uploading}
        appearance="primary"
      />
    </XForm>
  );
}

export default DocumentUploadForm;
```

## User Registration Form with Validation

```tsx
import React, { useState } from "react";
import {
  XForm,
  XInput,
  XRadio,
  XCheckbox,
  XSubmit,
} from "@jeremiemeunier/x-form";

function RegistrationForm() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (formData: FormData) => {
    // Clear previous errors
    setErrors({});

    // Extract values
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;
    const gender = formData.get("gender") as string;
    const terms = formData.get("terms");

    // Validate
    const newErrors: any = {};

    if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (!terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to API
    fetch("/api/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful:", data);
        window.location.href = "/welcome";
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setErrors({ form: "Registration failed. Please try again." });
      });
  };

  return (
    <div>
      <h2>Create Account</h2>
      <XForm onSubmit={handleSubmit}>
        <XInput
          name="username"
          label="Username"
          placeholder="Choose a username"
          required
          error={errors.username}
        />

        <XInput
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
          error={errors.email}
        />

        <XInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          required
          error={errors.password}
        />

        <XInput
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          required
          error={errors.confirm_password}
        />

        <XRadio
          name="gender"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ]}
          gridSize={2}
        />

        <XCheckbox name="terms" required error={errors.terms}>
          I accept the{" "}
          <a href="/terms" target="_blank">
            Terms and Conditions
          </a>
        </XCheckbox>

        <XCheckbox name="marketing">
          Send me promotional emails and updates
        </XCheckbox>

        {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}

        <XSubmit label="Create Account" appearance="primary" />
      </XForm>
    </div>
  );
}

export default RegistrationForm;
```

## Search Form Example

```tsx
import React from "react";
import { XForm, XInput, XSelect, XSubmit } from "@jeremiemeunier/x-form";

function SearchForm() {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query");
    const category = formData.get("category");
    const sortBy = formData.get("sort_by");

    // Build query string
    const params = new URLSearchParams();
    if (query) params.append("q", query as string);
    if (category) params.append("category", category as string);
    if (sortBy) params.append("sort", sortBy as string);

    // Navigate to search results
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <XForm onSubmit={handleSubmit} className="search-form">
      <XInput
        name="query"
        placeholder="Search..."
        type="search"
        required
      />

      <XSelect name="category" defaultValue="">
        <option value="">All Categories</option>
        <option value="products">Products</option>
        <option value="articles">Articles</option>
        <option value="documentation">Documentation</option>
      </XSelect>

      <XSelect name="sort_by" defaultValue="relevance">
        <option value="relevance">Relevance</option>
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
        <option value="title">Title A-Z</option>
      </XSelect>

      <XSubmit label="Search" appearance="primary" />
    </XForm>
  );
}

export default SearchForm;
```

## Working with Multiple Files

```tsx
import React from "react";
import { XForm, XInput, XSubmit } from "@jeremiemeunier/x-form";

function MultiFileUploadForm() {
  const handleSubmit = (formData: FormData) => {
    // Get all files
    const files = formData.getAll("documents");
    
    console.log(`Uploading ${files.length} files`);
    
    // Send to server
    fetch("/api/documents/batch", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Files uploaded:", data);
      });
  };

  return (
    <XForm onSubmit={handleSubmit}>
      <XInput
        name="documents"
        label="Select Multiple Files"
        type="file"
        // Note: Add 'multiple' attribute via native HTML if needed
      />

      <XSubmit label="Upload All" />
    </XForm>
  );
}

export default MultiFileUploadForm;
```

## Tips for Using x-form

1. **FormData Advantages**: FormData automatically handles file uploads and multipart encoding
2. **Name Attribute**: Always provide a unique `name` prop - it's required for FormData extraction
3. **Default Values**: Use `defaultValue` instead of controlled state for better performance
4. **File Handling**: Files are automatically included in FormData when using `type="file"`
5. **Multiple Values**: Use `formData.getAll(name)` for fields with multiple values (like multiple checkboxes)
6. **Conversion**: Convert FormData to object with `Object.fromEntries(formData)` for simple forms
7. **Validation**: Perform validation in the `onSubmit` handler before sending to API
8. **Reset**: Reset form after submission with `event.currentTarget.reset()`

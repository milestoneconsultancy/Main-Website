export function renderErrorPage(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Something went wrong</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      margin: 0;
      background: #f8fafc;
      color: #1a2a4a;
      padding: 1rem;
    }
    .card {
      max-width: 480px;
      padding: 2rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.08);
      text-align: center;
    }
    h1 {
      font-size: 1.5rem;
      margin: 0 0 0.5rem;
    }
    p {
      color: #4a5a72;
      margin: 0 0 1.5rem;
    }
    a {
      display: inline-block;
      padding: 0.6rem 1.5rem;
      background: #f47c20;
      color: white;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      background: #e06b10;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚠️ Something went wrong</h1>
    <p>We're sorry, but the page couldn't be loaded. Please try again later.</p>
    <a href="/">Go home</a>
  </div>
</body>
</html>
  `;
}

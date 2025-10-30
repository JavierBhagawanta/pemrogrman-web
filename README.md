# Tata cara install tailwindcss #

## 1. install taildwind ##
```bash
npm install tailwindcss @tailwindcss/cli
```

## 2. buat file main.css, dan isi seperti ini: ##
```bash
@import "tailwindcss";
```

## 3. Kemudian compile ##
```bash
npx @tailwindcss/cli -i ./src/main.css -o ./src/output.css --watch
```
# BMS-front-end

A very simple interface based on [Paperbase](https://material-ui.com/store/previews/paperbase/)  to learn [Next.js](https://nextjs.org/) ~~(even though there's no need for SSR)~~ and [Material UI](https://material-ui.com/) and of course finish the course project in a fancier way..

## Usage

First, you can clone this repository:

```sh
git clone https://github.com/BMS-2021/BMS-front-end.git
```

Install the dependencies:

```sh
yarn install
```

## Run

Start the development server:

```sh
yarn dev
```

Visit http://localhost:3000 to have a look~

## Build

For production build & deployment, a Dockerfile is simply _copied_ from [nextjs.org](https://nextjs.org/docs/deployment#docker-image):

```sh
docker build . -t bms-front-end
docker run -p 3000:3000 --name bms-front-end bms-front-end
```

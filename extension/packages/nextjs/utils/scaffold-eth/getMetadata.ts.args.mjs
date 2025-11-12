// Reference the example args file: https://github.com/scaffold-eth/create-eth-extensions/blob/example/extension/packages/nextjs/app/utils/scaffold-eth/getMetadata.ts.args.mjs
// Reference the template file that will use this file: https://github.com/scaffold-eth/create-eth/blob/main/templates/base/packages/nextjs/app/utils/scaffold-eth/getMetadata.ts.template.mjs

// Default args:
export const preContent = `
function buildMiniappEmbed(imageUrl: string, imageRelativePath: string, title: string, baseUrl: string): string {
  const miniappBaseUrl = getMiniappBaseUrl(baseUrl);
  const miniappImageUrl = getMiniappImageUrl(baseUrl, imageRelativePath);
  return JSON.stringify({
    version: "1",
    imageUrl: miniappImageUrl || imageUrl || process.env.NEXT_PUBLIC_IMAGE_URL,
    button: {
      title: process.env.NEXT_PUBLIC_APP_NAME || title,
      action: {
        url: miniappBaseUrl,
        type: "launch_miniapp",
        name: title || process.env.NEXT_PUBLIC_APP_NAME,
        splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || new URL("/favicon.png", miniappBaseUrl).toString(),
        splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#212638",
      },
    },
  });
}

function getMiniappBaseUrl(baseUrl: string): string {
  return process.env.NEXT_PUBLIC_URL || baseUrl;
}

function getMiniappImageUrl(baseUrl: string, imageRelativePath: string): string {
  return new URL(imageRelativePath, getMiniappBaseUrl(baseUrl)).toString();
}
`

// export const metadataOverrides = {
//   other: {
//     "fc:miniapp": `$$JSON.stringify({'a': 'b'})$$`,
//   },
// };

export const metadataOverrides = {
  metadataBase: '$$new URL(getMiniappBaseUrl(baseUrl))$$',
  openGraph: {
    images: [
      {
        url: '$$getMiniappImageUrl(baseUrl, imageRelativePath)$$',
      },
    ],
  },
  twitter: {
    images: ['$$getMiniappImageUrl(baseUrl, imageRelativePath)$$'],
  },
  other: {
    "fc:miniapp": `$$buildMiniappEmbed(imageUrl, imageRelativePath, title, baseUrl)$$`,
  },
};

export const titleTemplate = "%s | Scaffold-ETH 2 + MiniApp";


export const thumbnailPath = "/thumbnail_miniapp.jpg";


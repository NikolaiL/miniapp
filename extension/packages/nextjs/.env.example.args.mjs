export const additionalVars = `
# essential miniapp related variables
NEXT_PUBLIC_APP_NAME='Scaffold-ETH 2 MiniApp'

NEXT_PUBLIC_URL=https://yourdomain.dev
NEXT_PUBLIC_PONDER_URL=https://yourponderdomain.dev

# essential miniapp manifest related variables
# you can get create them at https://farcaster.xyz/~/developers/mini-apps/manifest
# required for production
FARCASTER_HEADER=header
FARCASTER_PAYLOAD=payload
FARCASTER_SIGNATURE=signature

### optional miniapp related variables

# icon for miniapp listsing
NEXT_PUBLIC_APP_ICON=\${NEXT_PUBLIC_URL}/favicon.png

# up to 30 characters, no special characters
NEXT_PUBLIC_APP_SUBTITLE="Built with Scaffold ETH 2"

# TODO::: add all value description

# Must not contain emojis or special characters
NEXT_PUBLIC_APP_DESCRIPTION="Built with Scaffold-ETH 2 with MiniApp Extension"

# square image
NEXT_PUBLIC_APP_SPLASH_IMAGE=\${NEXT_PUBLIC_URL}/favicon.png

NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR="#212638"

# possible values:
# One of: games, social, finance, utility, productivity, health-fitness, news-media, 
# music, shopping, education, developer-tools, entertainment, art-creativity
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=developer-tools

# hero image for listing in farcaster miniapp page abd base app miniapp directory
NEXT_PUBLIC_APP_HERO_IMAGE=\${NEXT_PUBLIC_URL}/thumbnail_miniapp.jpg

NEXT_PUBLIC_APP_TAGLINE="Built with Scaffold ETH 2"

# og values for twitter, facebook sharing
NEXT_PUBLIC_APP_OG_TITLE="Scaffold-ETH 2 with MiniApp"
NEXT_PUBLIC_APP_OG_DESCRIPTION="Built with Scaffold-ETH 2 with MiniApp Extension"
NEXT_PUBLIC_APP_OG_IMAGE=\${NEXT_PUBLIC_URL}/thumbnail_miniapp.jpg

# Descriptive tags for filtering/search. 
# Comma-separated list of up to 5 tags
# Each tag is: max 20 characters, lowercase, no spaces, no special characters, no emojis.
NEXT_PUBLIC_APP_TAGS="scaffoldeth, miniapp, farcaster, base, ponder"

# comma separated list of screenshot images with full domain
NEXT_PUBLIC_APP_SCREENSHOTS="\${NEXT_PUBLIC_URL}/thumbnail_miniapp.jpg, \${NEXT_PUBLIC_URL}/thumbnail_miniapp.jpg"
`;
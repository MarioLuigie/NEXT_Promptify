/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, //nie wymagane w next 14 bo stabilne
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

export default nextConfig

// Experimental Server Components External Packages: Ustawia zewnętrzne pakiety, które mają być używane z eksperymentalnymi komponentami serwerowymi. W tym przypadku ustawiasz mongoose jako zewnętrzny pakiet dla tych komponentów, co może być przydatne, jeśli używasz mongoose w połączeniu z komponentami serwerowymi w Next.js.

// Images Domains: Konfiguruje domeny, z których można ładować obrazy. W tym przypadku ustawiasz lh3.googleusercontent.com, co oznacza, że obrazy z tej domeny będą obsługiwane przez Image Optimization w Next.js.

//Webpack Config: Ta funkcja pozwala na niestandardową konfigurację webpacka, która jest używana przez Next.js. W tym przypadku dodajesz eksperymentalną opcję topLevelAwait, która pozwala na używanie topLevelAwait w Twoim kodzie JavaScript. topLevelAwait to funkcja JavaScript, która pozwala na używanie await na najwyższym poziomie modułu.

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     // appDir: true, //nie wymagane w next 14 bo stabilne
//     serverComponentsExternalPackages: ["mongoose"],
//   },
//   images: {
//     domains: ['lh3.googleusercontent.com'],
//   }, ====> zdeprecjonowane od Next 14
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true,
//     }
//     return config
//   }
// }

// export default nextConfig

////   images: {
//     domains: ['lh3.googleusercontent.com'],
//   }, ====> zdeprecjonowane od Next 14 zastapić tym co powyzej

// Oto co oznacza ten zapis:

//     module.exports = { ... }: Eksportowanie obiektu konfiguracyjnego w Node.js.
//     images: Sekcja konfiguracji dotycząca obrazów.
//     remotePatterns: Lista wzorców (patterns) dozwolonych zdalnych źródeł obrazów.
//         protocol: Protokół, który musi być używany (np. https).
//         hostname: Hostname (nazwa hosta), z którego obrazy są pobierane (np. example.com).
//         port: Port, z którego obrazy są pobierane (pusty string oznacza domyślny port, czyli 80 dla http i 443 dla https).
//         pathname: Ścieżka, która musi pasować do obrazów (tu: /account123/** oznacza, że dowolne pliki w katalogu account123 i jego podkatalogach są dozwolone).

// Przykład ten zezwala na ładowanie obrazów z serwera https://example.com z dowolną ścieżką zaczynającą się od /account123/.

// W tym przykładzie:

//     protocol: 'https': Ustawia protokół na https.
//     hostname: 'lh3.googleusercontent.com': Ustawia nazwę hosta na lh3.googleusercontent.com.
//     port: '': Pozostawia port pusty, co oznacza domyślny port dla https (443).
//     pathname: '/**': Pozwala na wszystkie ścieżki (/** oznacza dowolną ścieżkę).

// Taka konfiguracja pozwoli Next.js na ładowanie obrazów z dowolnej ścieżki na domenie lh3.googleusercontent.com za pomocą protokołu HTTPS.

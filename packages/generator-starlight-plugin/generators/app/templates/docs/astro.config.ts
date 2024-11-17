import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import <%= importName %> from '<%= repositoryName %>'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/<%= githubOwner %>/<%= repositoryName %>/edit/main/docs/',
      },
      plugins: [<%= importName %>()],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/<%= githubOwner %>/<%= repositoryName %>',
      },
      title: '<%= repositoryName %>',
    }),
  ],
})

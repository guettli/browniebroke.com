import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Avatar from '../components/avatar'
import Layout from '../components/layout'
import PostsList from '../components/posts'
import SectionTitleStyles from '../components/section-title'
import SeeMoreStyles from '../components/see-more'
import SEO from '../components/seo'
import SocialLinks from '../components/social'

const HeroSectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BioStyles = styled.p`
  text-align: center;
  max-width: 400px;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title="Home" />
      <HeroSectionStyles>
        <h1>Bruno Alla's Blog</h1>
        <Avatar sharpImage={data.avatarImage.childImageSharp} />
        <BioStyles>
          Hi! I'm a web developer based in London, I work mostly with Python &
          Django, but I also do a bit of Javascript on the side, mainly with
          Gatsby.
        </BioStyles>
        <SocialLinks />
      </HeroSectionStyles>
      <section>
        <SectionTitleStyles>Most recent posts</SectionTitleStyles>

        <PostsList posts={posts} />

        <SeeMoreStyles>
          <Link to="/posts/">See more...</Link>
        </SeeMoreStyles>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    avatarImage: file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fixed(width: 160) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

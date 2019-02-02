import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import { Location, Link as RouterLink } from '@storybook/router';
import { TreeState } from './treeview/treeview';

import SidebarItem from './SidebarItem';
import SidebarSearch from './SidebarSearch';
import SidebarSubheading from './SidebarSubheading';

const Search = styled(SidebarSearch)({
  margin: '0 20px 1rem',
});

const Subheading = styled(SidebarSubheading)({
  margin: '0 20px',
});

const Section = styled.section({
  '& + section': {
    marginTop: 20,
  },
  '&:last-of-type': {
    marginBottom: 40,
  },
});

const List = styled.div();
List.displayName = 'List';

const UnstyledRouterLink = styled(RouterLink)({
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
});

const Wrapper = styled.div({});

export const Link = ({ id, prefix, children, ...rest }) => (
  <Location>
    {({ viewMode }) => (
      <UnstyledRouterLink to={`/${viewMode || 'story'}/${id}`} {...rest}>
        {children}
      </UnstyledRouterLink>
    )}
  </Location>
);
Link.displayName = 'Link';
Link.propTypes = {
  id: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const SidebarStories = React.memo(({ stories, storyId, loading, className, ...rest }) => {
  const list = Object.entries(stories);

  if (loading) {
    return (
      <Wrapper className={className}>
        <SidebarItem loading />
        <SidebarItem loading />
        <SidebarItem depth={1} loading />
        <SidebarItem depth={1} loading />
        <SidebarItem depth={2} loading />
        <SidebarItem depth={3} loading />
        <SidebarItem depth={3} loading />
        <SidebarItem depth={3} loading />
        <SidebarItem depth={1} loading />
        <SidebarItem depth={1} loading />
        <SidebarItem depth={1} loading />
        <SidebarItem depth={2} loading />
        <SidebarItem depth={2} loading />
        <SidebarItem depth={2} loading />
        <SidebarItem depth={3} loading />
        <SidebarItem loading />
        <SidebarItem loading />
      </Wrapper>
    );
  }

  if (list.length < 1) {
    return (
      <Wrapper className={className}>
        <Placeholder key="empty">
          There are no stories. Learn how to{' '}
          <a
            href="https://storybook.js.org/basics/writing-stories/"
            target="_blank"
            rel="noopener noreferrer"
          >
            write component stories
          </a>
        </Placeholder>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <TreeState
        key="treestate"
        dataset={stories}
        prefix="explorer"
        selectedId={storyId}
        filter=""
        List={List}
        Head={SidebarItem}
        Link={Link}
        Leaf={p => <SidebarItem isStory {...p} />}
        Title={Subheading}
        Section={Section}
        Message={Placeholder}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        Filter={Search}
        {...rest}
      />
    </Wrapper>
  );
});
SidebarStories.propTypes = {
  loading: PropTypes.bool,
  stories: PropTypes.shape({}).isRequired,
  storyId: PropTypes.string,
  className: PropTypes.string,
};
SidebarStories.defaultProps = {
  storyId: undefined,
  loading: false,
  className: null,
};

export default SidebarStories;
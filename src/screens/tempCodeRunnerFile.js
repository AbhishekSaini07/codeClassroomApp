 const TagListComponent = ({ tags, onSelectTag }) => {
      return (
        <Nav defaultActiveKey="All" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="All" onSelect={() => onSelectTag("All")}>All</Nav.Link>
          </Nav.Item>
          {tags.map(tag => (
            <Nav.Item key={tag}>
              <Nav.Link eventKey={tag} onSelect={() => onSelectTag(tag)}>{tag}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      );
    };
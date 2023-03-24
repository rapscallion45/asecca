/*
 ** helper function for formatting costs_config query param string
 */
const getCostsSourceQueryString = (source: string, dataId: string) => {
  const sourceString = () => {
    switch (source) {
      case 'Customer':
        return 'customer';
      case 'Project':
        return 'project';
      case 'Collection':
        return 'collection';
      default:
        return '';
    }
  };

  return `${sourceString()}=${dataId}`;
};

export default getCostsSourceQueryString;

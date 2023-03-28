/*
 ** helper function for formatting costs config query param string
 */
const getCostsConfigSourceQueryString = (source: string, dataId: string) => {
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

export default getCostsConfigSourceQueryString;

const getProjectType = (project: string): string | undefined => {
  switch (project) {
    case 'TM':
      return 'Time & Materials';
    case 'FF':
      return 'Fixed Fee';
    case 'NB':
      return 'Non-Billable';
    case 'ODC':
      return 'ODC';
    case 'PR':
      return 'Product';
    case 'TR':
      return 'Training';
  }
};

export default getProjectType;

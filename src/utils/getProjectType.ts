const getProjectType = (projectType: number): string | undefined => {
  switch (projectType) {
    case 0: {
      return 'Time & Materials';
    }
    case 1: {
      return 'Fixed Fee';
    }
    case 2: {
      return 'Non-Billable';
    }
    case 3: {
      return 'ODC';
    }
    case 4: {
      return 'Product';
    }
    case 5: {
      return 'Training';
    }
  }
};

export default getProjectType;

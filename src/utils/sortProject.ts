import { IAllProjectResponse, ISortProjectState } from '../interfaces/interface';

const sortProject = (projects: IAllProjectResponse[]): ISortProjectState[] => {
  const listCustomerName = projects.reduce<string[]>((accumulator, project): string[] => {
    if (!accumulator.includes(project.customerName)) {
      accumulator.push(project.customerName);
    }
    return accumulator;
  }, []);

  const newProjectsAfterSort = listCustomerName.map((customerName): ISortProjectState => {
    const objectProject: ISortProjectState = {
      customerName,
      projects: []
    };

    objectProject.projects = projects.reduce<IAllProjectResponse[]>(
      (accumulator, project): IAllProjectResponse[] => {
        if (project.customerName === customerName) {
          accumulator.push(project);
        }

        return accumulator;
      },
      []
    );

    return objectProject;
  });

  return newProjectsAfterSort;
};

export default sortProject;

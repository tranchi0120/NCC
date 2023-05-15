import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

export interface IOptions {
  message: string
  description: string
  duration?: number
  placement?: NotificationPlacement
  key?: string
}

const getOptions = (props: IOptions): Required<IOptions> => {
  return {
    duration: 2,
    placement: 'top',
    key: '1',
    ...props
  };
};

const Noti = {
  success: (props: IOptions) => {
    const options = getOptions(props);
    notification.success(options);
  },
  error: (props: IOptions) => {
    const options = getOptions(props);
    notification.error(options);
  },
  warning: (props: IOptions) => {
    const options = getOptions(props);
    notification.warning(options);
  },
  info: (props: IOptions) => {
    const options = getOptions(props);
    notification.info(options);
  }
};

export default Noti;

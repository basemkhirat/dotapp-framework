import Config from '~/services/config';
import aws from 'aws-sdk';

aws.config.update(Config.get("services.aws"));

export default aws;


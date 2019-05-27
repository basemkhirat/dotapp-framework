import Config from '~/services/config';
import aws from 'aws-sdk';

aws.config.update(Config.get("aws"));

export default aws;


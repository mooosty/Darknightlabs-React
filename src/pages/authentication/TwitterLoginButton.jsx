

import { ProviderEnum } from '@dynamic-labs/types';
import { useSocialAccounts } from '@dynamic-labs/sdk-react-core';

const TwitterLoginButton = () => {
    const { signInWithSocialAccount } = useSocialAccounts();

    return (
        <button onClick={() => signInWithSocialAccount(ProviderEnum.Twitter)}>
            Sign in with Twitter
        </button>
    );
};

export default TwitterLoginButton;
  

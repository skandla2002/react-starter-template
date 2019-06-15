const buildValidations = require('./build-utils/build-validations');
const commonConfig = require('./build-utils/webpack.common');

const webpackMerge = require('webpack-merge');

const addons = (/* string | string[] */ addonsArg) => {
    // 애드온(addon) 목록을 노멀라이즈(Normalized) 한다
    let addons = [...[addonsArg]]
        .filter(Boolean);
    
    return addons.map(addonName =>
        require(`./build-utils/addons/webpack.${addonName}.js`)
    );
};

module.exports = env => {
    // 'buildValidations'를 사용해 'env' 플래그를 확인한다.
    if(!env){
        throw new Error(buildValidations.ERR_NO_ENV_FLAG);
    }

    // 개발 또는 프로덕션 모드 중 사용할 웨팩 구성을 선택한다.
    const envConfig = require(`./build-utils/webpack.${env.env}.js`);

    // 'webpack-merge'는 공유된 구성 설정, 특정 환경 설정, 애드온을 합친다.
    const mergeConfig = webpackMerge(
        commonConfig,
        envConfig,
        ...addons(env.addons)
    );

    // 웹팩 최종 구성을 반환한다
    return mergeConfig;

}
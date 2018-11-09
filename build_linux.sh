#!/usr/bin/env bash
re="registry.cn-beijing.aliyuncs.com/lanjing/([^:]+):([^ ]+)"
imageStr=$(kubectl --kubeconfig $KUBECONFIG_TEST get deploy cailianpress-admin-web -o jsonpath='{..image}')
echo "current version"
if [[ $imageStr =~ $re ]]; then echo ${BASH_REMATCH[2]}; fi


if [ $# -eq 0 ];
then nextVersion=$(./increment_version.sh -p ${BASH_REMATCH[2]});
else nextVersion=$(./increment_version.sh $1 ${BASH_REMATCH[2]});
fi

echo "next version"
echo $nextVersion;

git add .
git commit -m $nextVersion --no-verify
git push

npm run build
rm -rf dist.tar.gz
tar -czf dist.tar.gz dist
docker build -t registry.cn-beijing.aliyuncs.com/lanjing/cailianpress-admin-web:$nextVersion .
rm -rf dist.tar.gz
docker push registry.cn-beijing.aliyuncs.com/lanjing/cailianpress-admin-web:$nextVersion
kubectl --kubeconfig $KUBECONFIG_TEST set image deployment/cailianpress-admin-web cailianpress-admin-web=registry.cn-beijing.aliyuncs.com/lanjing/cailianpress-admin-web:$nextVersion
kubectl --kubeconfig $KUBECONFIG_TEST get pod -l app=cailianpress-admin-web

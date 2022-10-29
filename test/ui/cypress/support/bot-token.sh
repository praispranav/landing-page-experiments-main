#!/bin/sh

# Environment to generate the token and secret for
ENV=$1

# Name of your config file within bots-provider
CONFIG_NAME=$2

case $ENV in
dev)
    ACC_ACCOUNT_ID=408882511473
    VAULT_ADDR=https://vault-eu-central-1.vault.dazn-stage.com
    ;;
test)
    ACC_ACCOUNT_ID=734590493808
    VAULT_ADDR=https://vault-eu-central-1.vault.dazn-stage.com
    ;;
stage)
    ACC_ACCOUNT_ID=240680620468
    VAULT_ADDR=https://vault-eu-central-1.vault.dazn-stage.com
    ;;
prod)
    ACC_ACCOUNT_ID=480309102926
    VAULT_ADDR=https://vault-eu-central-1.vault.indazn.com
    ;;
esac

export VAULT_ADDR=$VAULT_ADDR
export VAULT_NAMESPACE=acc-user-management
export VAULT_TOKEN=$(
    dazn aws exec -p $ACC_ACCOUNT_ID --pset "vault-accusermgmt" \
    -- vault login -token-only -method=aws role=$ACC_ACCOUNT_ID-bots-read-access-$CONFIG_NAME
)

echo "token: $VAULT_TOKEN"

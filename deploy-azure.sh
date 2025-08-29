#!/bin/bash

# Variáveis
RESOURCE_GROUP="agenda-telefonica-rg"
LOCATION="eastus"
SQL_SERVER="agenda-telefonica-server"
SQL_DATABASE="AgendaTelefonicaDB"
SQL_ADMIN="sqladmin"
APP_SERVICE_PLAN="agenda-telefonica-plan"
WEB_APP="agenda-telefonica-api"
STATIC_WEB_APP="agenda-telefonica-frontend"

# Criar Resource Group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Criar SQL Server
echo "Digite a senha do SQL Server:"
read -s SQL_PASSWORD
az sql server create \
  --name $SQL_SERVER \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user $SQL_ADMIN \
  --admin-password $SQL_PASSWORD

# Criar SQL Database
az sql db create \
  --resource-group $RESOURCE_GROUP \
  --server $SQL_SERVER \
  --name $SQL_DATABASE \
  --service-objective Basic

# Configurar firewall do SQL Server
az sql server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --server $SQL_SERVER \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Criar App Service Plan
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --sku B1 \
  --is-linux

# Criar Web App
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $WEB_APP \
  --runtime "DOTNETCORE:8.0"

# Configurar connection string
CONNECTION_STRING="Server=tcp:$SQL_SERVER.database.windows.net,1433;Initial Catalog=$SQL_DATABASE;Persist Security Info=False;User ID=$SQL_ADMIN;Password=$SQL_PASSWORD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

az webapp config connection-string set \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP \
  --connection-string-type SQLAzure \
  --settings DefaultConnection="$CONNECTION_STRING"

# Criar Static Web App
az staticwebapp create \
  --name $STATIC_WEB_APP \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

echo "Deploy concluído!"
echo "API URL: https://$WEB_APP.azurewebsites.net"
echo "Frontend URL: https://$STATIC_WEB_APP.azurestaticapps.net"
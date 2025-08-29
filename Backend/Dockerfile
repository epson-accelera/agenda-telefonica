FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AgendaTelefonica.API/AgendaTelefonica.API.csproj", "AgendaTelefonica.API/"]
COPY ["AgendaTelefonica.Data/AgendaTelefonica.Data.csproj", "AgendaTelefonica.Data/"]
COPY ["AgendaTelefonica.Services/AgendaTelefonica.Services.csproj", "AgendaTelefonica.Services/"]
RUN dotnet restore "AgendaTelefonica.API/AgendaTelefonica.API.csproj"
COPY . .
WORKDIR "/src/AgendaTelefonica.API"
RUN dotnet build "AgendaTelefonica.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AgendaTelefonica.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AgendaTelefonica.API.dll"]
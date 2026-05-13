FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["StackByAivre.Server/StackByAivre.Server.csproj", "StackByAivre.Server/"]
COPY ["StackByAivre.Shared/StackByAivre.Shared.csproj", "StackByAivre.Shared/"]
COPY ["StackByAivre.AI/StackByAivre.AI.csproj", "StackByAivre.AI/"]
RUN dotnet restore "StackByAivre.Server/StackByAivre.Server.csproj"
COPY . .
WORKDIR "/src/StackByAivre.Server"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "StackByAivre.Server.dll"]

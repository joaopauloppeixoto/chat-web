FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["ChatWeb.API/ChatWeb.API.csproj", "ChatWeb.API/"]
RUN dotnet restore "ChatWeb.API/ChatWeb.API.csproj"
COPY . .
WORKDIR "/src/ChatWeb.API"
RUN dotnet build "ChatWeb.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ChatWeb.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV ASPNETCORE_URLS=http://+:80

ENTRYPOINT ["dotnet", "ChatWeb.API.dll"]
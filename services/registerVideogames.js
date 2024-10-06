import { databaseExecute } from "../database/database.js"
import { v4 } from "uuid"
import { pool } from "../database/database.js"

export const registerVideogamesSCV = async (name, description, photo, filtersObj, minRequirements, recRequirements, price, userId) => {

    const videogameId = v4()

    let categoryFilterText = filtersObj.filters.find(filter => filter.name === "Category").subfilters.map(subfilter => subfilter.label).join(', ');
    let categoryFilterValues = filtersObj.filters.find(filter => filter.name === "Category").subfilters.map(subfilter => subfilter.checked ? 1 : 0);

    let operatingSystemFilterText = filtersObj.filters.find(filter => filter.name === "Operating System").subfilters.map(subfilter => subfilter.label).join(', ');
    let operatingSystemFilterValues = filtersObj.filters.find(filter => filter.name === "Operating System").subfilters.map(subfilter => subfilter.checked ? 1 : 0);

    let languageFilterText = filtersObj.filters.find(filter => filter.name === "Language").subfilters.map(subfilter => subfilter.label).join(', ');
    let languageFilterValues = filtersObj.filters.find(filter => filter.name === "Language").subfilters.map(subfilter => subfilter.checked ? 1 : 0);

    let playersFilterText = filtersObj.filters.find(filter => filter.name === "Players").subfilters.map(subfilter => subfilter.label).join(', ');
    let playersFilterValues = filtersObj.filters.find(filter => filter.name === "Players").subfilters.map(subfilter => subfilter.checked ? 1 : 0);


    const insertVideogame = "INSERT INTO videogames (videogameId, userId, name, description, photo, minRequirements, recRequirements, price, views, purchases, wishlists, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const resultsInsert = await databaseExecute(insertVideogame, [videogameId, userId, name, description, photo, minRequirements, recRequirements, price, 0, 0, 0, 0])

    const insertFilterCategory = `INSERT INTO filterCategory (videogameId, ${categoryFilterText}) VALUES (?, ${categoryFilterValues.map(() => '?').join(', ')})`
    const resultsCategory = await databaseExecute(insertFilterCategory, [videogameId, ...categoryFilterValues])

    const insertFilterOperatingSystem = `INSERT INTO filterOperatingSystem (videogameId, ${operatingSystemFilterText}) VALUES (?, ${operatingSystemFilterValues.map(() => '?').join(', ')})`
    const resultsOperatingSystem = await databaseExecute(insertFilterOperatingSystem, [videogameId, ...operatingSystemFilterValues])

    const insertFilterLanguage = `INSERT INTO filterLanguage (videogameId, ${languageFilterText}) VALUES (?, ${languageFilterValues.map(() => '?').join(', ')})`
    const resultsLanguage = await databaseExecute(insertFilterLanguage, [videogameId, ...languageFilterValues])
    
    const insertFilterPlayers = `INSERT INTO filterPlayers (videogameId, ${playersFilterText}) VALUES (?, ${playersFilterValues.map(() => '?').join(', ')})`
    const resultsPlayers = await databaseExecute(insertFilterPlayers, [videogameId, ...playersFilterValues])

    return true;
}

export const obtainVideogamesSCV = async (filtersArray, qualification, page, limit) => {

    let querry = `
        SELECT 
            *
        FROM 
            videogames 
        JOIN 
            filterCategory
        ON 
            videogames.videogameId = filterCategory.videogameId    
        JOIN 
            filterLanguage
        ON 
            videogames.videogameId = filterLanguage.videogameId
        JOIN 
            filterOperatingSystem
        ON 
            videogames.videogameId = filterOperatingSystem.videogameId
        JOIN 
            filterPlayers
        ON 
            videogames.videogameId = filterPlayers.videogameId
        WHERE 1=1 `

    filtersArray.forEach((filter) => {
        querry += `AND ${filter} = 1 `;
    }
    );

    if (qualification) {
        querry += `AND qualification = ${qualification} `;
    }

    querry += `LIMIT ${limit} OFFSET ${(page - 1) * limit};`

    const videogames = await databaseExecute(querry)

    if (!videogames) return false
    
    return videogames;
}
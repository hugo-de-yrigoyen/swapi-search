import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import swapiService from '../services/swapiService';

export const search = async (req: AuthRequest, res: Response) => {
  try {
    const { q: query, type } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const results = await swapiService.searchAll(query);

    // Filter by type if specified
    if (type && typeof type === 'string') {
      results.results = results.results.filter(result => result.type === type);
      results.totalCount = results.results.length;
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search the Imperial database' });
  }
};

export const getDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { type, id } = req.params;

    if (!type || !id) {
      return res.status(400).json({ error: 'Type and ID parameters are required' });
    }

    const details = await swapiService.getDetails(type, id);
    res.json(details);
  } catch (error) {
    console.error('Get details error:', error);
    res.status(500).json({ error: 'Failed to get details from the Imperial database' });
  }
};
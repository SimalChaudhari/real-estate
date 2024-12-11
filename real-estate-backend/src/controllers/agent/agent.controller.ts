import { Request, Response, NextFunction } from 'express';
import Agent, { IAgent, Category } from '../../models/agent';


// Create an Agent
export const createAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city, category, name, imgSrc, propertiesCount, starRating, agencyTitle, address } = req.body;

    const newAgent = new Agent({
      city,
      category,
      name,
      imgSrc,
      propertiesCount,
      starRating,
      agencyTitle,
      address,
    });

    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    next(error);
  }
};

// Get All Agents
export const getAgents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    next(error);
  }
};

// Get Agent by ID
export const getAgentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }
    res.status(200).json(agent);
  } catch (error) {
    next(error);
  }
};

// Update Agent
export const updateAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city, category, name, imgSrc, propertiesCount, starRating, agencyTitle, address } = req.body;

    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      { city, category, name, imgSrc, propertiesCount, starRating, agencyTitle, address },
      { new: true, runValidators: true }
    );

    if (!updatedAgent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }

    res.status(200).json(updatedAgent);
  } catch (error) {
    next(error);
  }
};

// Delete Agent
export const deleteAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    next(error);
  }
};

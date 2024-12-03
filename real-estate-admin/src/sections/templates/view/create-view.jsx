import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Button,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate, useParams } from 'react-router'; // Access route params for edit mode
import { useDispatch, useSelector } from 'react-redux';
import { createTemplate, updateTemplate, fetchTemplateById } from 'src/store/templateSlice';
import { fetchCustomFields } from 'src/store/settingCustomFieldSlice';
import { z } from 'zod';

// Zod validation schema
const TemplateSchema = z.object({
    name: z.string().min(1, { message: 'Template name is required!' }),
    type: z.string().min(1, { message: 'Template type is required!' }),
});

// Draggable Field Component
const DraggableField = ({ field }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'field',
        item: { ...field },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <Button
            ref={drag}
            variant="outlined"
            size="large"
            sx={{
                width: '100%',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            {field.fieldType}
        </Button>
    );
};

const DroppableArea = ({ selectedFields, setSelectedFields }) => {
    const [, drop] = useDrop(() => ({
        accept: 'field',
        drop: (item) => {
            const exists = selectedFields.some((field) => field.fieldName === item.fieldName);
            if (!exists) {
                setSelectedFields((prev) => [...prev, item]);
            }
        },
    }));

    return (
        <Box
            ref={drop}
            sx={{
                mt: 1,
                padding: 2,
                border: '1px dashed',
                borderColor: 'grey',
                minHeight: '100px',
                borderRadius: '4px',
            }}
        >
            <Grid container spacing={2}>
                {selectedFields.map((field) => (
                    <Grid item key={field.id} xs={6} sm={4} md={3}>
                        <Button variant="outlined" size="large" sx={{ width: '100%' }}>
                            {field.fieldType}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export function CreateTemplates() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // Capture template ID for edit mode

    const { loading, error } = useSelector((state) => state.templates);
    const { fields } = useSelector((state) => state.settingCustomField);

    const [templateName, setTemplateName] = useState('');
    const [templateType, setTemplateType] = useState('');
    const [selectedFields, setSelectedFields] = useState([]);
    const [formError, setFormError] = useState('');

    // Fetch custom fields and template data if in edit mode
    useEffect(() => {
        const loadCustomFieldsAndTemplate = async () => {
            try {
                // Fetch custom fields
                await dispatch(fetchCustomFields());

                // If an ID exists, we're in edit mode, so fetch the template data
                if (id) {
                    const result = await dispatch(fetchTemplateById(id));

                    if (result.payload) {
                        const template = result.payload;

                        // Set template name and type
                        setTemplateName(template.name);
                        setTemplateType(template.type);

                        // Format available fields from the fetched template
                        const formattedFields = template.availableFields.map((field) => ({
                            fieldName: field.field.replace(/\s+/g, '').toLowerCase(),
                            fieldType: field.type,
                        }));

                        setSelectedFields(formattedFields);
                    } else {
                        console.error('Failed to load template data.');
                    }
                }
            } catch (err) {
                console.error('Error fetching custom fields or template data:', err);
            }
        };

        loadCustomFieldsAndTemplate();
    }, [dispatch, id]);

    const handleSubmit = async () => {
        const templateData = {
            name: templateName,
            type: templateType,
            availableFields: selectedFields && selectedFields.map((field) => ({
                field: field.fieldName.replace(/\s+/g, '').toLowerCase(),
                type: field.fieldType,
                label: field.fieldName,
            })),
        };

        // Validate template data with Zod
        const validation = TemplateSchema.safeParse(templateData);

        if (!validation.success) {
            setFormError(validation.error.issues[0].message);
            return;
        }

        try {
            if (id) {
                await dispatch(updateTemplate({ id, ...templateData }));
            } else {
                await dispatch(createTemplate(templateData));
            }
            navigate('/template');
        } catch {
            setFormError('Failed to save template. Please try again.');
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DashboardContent maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">All Fields</Typography>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    {fields.map((field) => (
                                        <Grid item xs={12} key={field.id}>
                                            <DraggableField field={field} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    {id ? 'Edit Template' : 'Create New Template'}
                                </Typography>

                                {formError && (
                                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                        {formError}
                                    </Typography>
                                )}

                                <Grid container spacing={2} sx={{ mt: 4 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Template Name"
                                            value={templateName}
                                            onChange={(e) => setTemplateName(e.target.value)}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <InputLabel>Template Type</InputLabel>
                                            <Select
                                                value={templateType}
                                                onChange={(e) => setTemplateType(e.target.value)}
                                            >
                                                <MenuItem value="Dispute">Dispute</MenuItem>
                                                <MenuItem value="Adjustment">Adjustment</MenuItem>
                                                <MenuItem value="Compensation">Compensation</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6">Available Fields</Typography>
                                        <DroppableArea
                                            selectedFields={selectedFields}
                                            setSelectedFields={setSelectedFields}
                                        />
                                    </Grid>

                                    <Grid item xs={12} display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => navigate('/template')} // Cancel button redirects to the template list
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : id ? 'Update Template' : 'Save Template'}
                                        </Button>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DashboardContent>
        </DndProvider>
    );
}

export default CreateTemplates;

import { Button } from '@shopify/polaris';
import {
    BlockStack,
    Card,
    Icon,
    InlineStack,
    List,
    Text,
    DropZone,
    LegacyStack ,Thumbnail
} from '@shopify/polaris';
import { ProductIcon } from '@shopify/polaris-icons';
import { NoteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import React from 'react';
export default function MyApp() {
    const [files, setFiles] = useState([]);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        [],
        
    );
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '0'}}>
      <LegacyStack vertical>
        {files.map((file, index) => (
          <LegacyStack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </LegacyStack>
        ))}
      </LegacyStack>
    </div>
  );
    return (
        <div>
            <h1>Welcome to my app</h1>
            <Button>Add product</Button>;
            <Card roundedAbove="sm">
                <BlockStack gap="200">
                    <Text as="h2" variant="headingSm">
                        Products
                    </Text>
                    <BlockStack inlineAlign="start">
                        <InlineStack gap="400">
                            <Icon source={ProductIcon} />
                            <Text as="h3" variant="headingSm">
                                New Products
                            </Text>
                        </InlineStack>
                    </BlockStack>
                    <List>
                        <List.Item>Socks</List.Item>
                        <List.Item>Super Shoes</List.Item>
                    </List>
                </BlockStack>
            </Card>
            <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
        </div>
    );
}
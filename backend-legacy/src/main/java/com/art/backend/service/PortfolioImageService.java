package com.art.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.art.backend.exception.PortfolioImagesNotFoundException;
import com.art.backend.model.PortfolioImage;
import com.art.backend.model.dto.PortfolioImageRequest;
import com.art.backend.model.dto.PortfolioImageResponse;
import com.art.backend.repository.PortfolioImageRepository;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PortfolioImageService {

    private final PortfolioImageRepository portfolioImageRepository;

    public PortfolioImageService(final PortfolioImageRepository portfolioImageRepository) {
        this.portfolioImageRepository = portfolioImageRepository;
    }

    public List<PortfolioImageResponse> getAllPortfolioImages() {
        log.debug("Loading all portfolio images from repository");
        return portfolioImageRepository.findAll().stream()
                .map(PortfolioImageService::mapToDto)
                .peek(dto -> log.debug("Mapped PortfolioImageResponse DTO: id={}, title={}", dto.getId(),
                        dto.getTitle()))
                .collect(Collectors.toList());
    }

    public PortfolioImageResponse getPortfolioImageById(final Long id) {
        log.debug("Loading portfolio image by id= {}", id);
        final PortfolioImage portfolioImage = portfolioImageRepository.findById(id)
                .orElseThrow(() -> new PortfolioImagesNotFoundException(id));
        return mapToDto(portfolioImage);
    }

    public PortfolioImageResponse createPortfolioImage(final PortfolioImageRequest request) {
        final PortfolioImage portfolioImage = mapToEntity(request);
        final PortfolioImage saved = portfolioImageRepository.save(portfolioImage);
        log.info("Created portfolio image with id= {}", saved.getId());
        return mapToDto(saved);
    }

    public PortfolioImageResponse updatePortfolioImage(final Long id, final PortfolioImageRequest request) {
        final PortfolioImage existingPortfolioImage = portfolioImageRepository.findById(id)
                .orElseThrow(() -> new PortfolioImagesNotFoundException(id));

        existingPortfolioImage.setTitle(request.getTitle());
        existingPortfolioImage.setYear(request.getYear());
        existingPortfolioImage.setImageUrls(request.getImageUrls());

        final PortfolioImage updatedPortfolioImage = portfolioImageRepository.save(existingPortfolioImage);
        log.info("Updated portfolio image with id= {}", updatedPortfolioImage.getId());
        return mapToDto(updatedPortfolioImage);
    }

    public void deletePortfolioImageById(final Long id) {
        if (!portfolioImageRepository.existsById(id)) {
            throw new PortfolioImagesNotFoundException(id);
        }
        portfolioImageRepository.deleteById(id);
        log.info("Deleted portfolio image with id= {}", id);
    }

    private static PortfolioImageResponse mapToDto(final PortfolioImage portfolioImage) {
        final PortfolioImageResponse dto = new PortfolioImageResponse();
        dto.setId(portfolioImage.getId());
        dto.setTitle(portfolioImage.getTitle());
        dto.setYear(portfolioImage.getYear());
        dto.setTags(portfolioImage.getTags());
        dto.setImageUrls(portfolioImage.getImageUrls());
        return dto;
    }

    private static PortfolioImage mapToEntity(final PortfolioImageRequest dto) {
        final PortfolioImage portfolioImage = new PortfolioImage();
        portfolioImage.setTitle(dto.getTitle());
        portfolioImage.setYear(dto.getYear());
        portfolioImage.setTags(dto.getTags());
        portfolioImage.setImageUrls(dto.getImageUrls());
        return portfolioImage;
    }
}

import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import CredentialList from '../assets/img/credential-list.svg'
import ScanShare from '../assets/img/scan-share.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { GenericFn } from '../types/fn'
import { testIdWithKey } from '../utils/testable'

import { useTheme } from '../contexts/theme'

import { ThemedText } from '../components/texts/ThemedText'
import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (OnboardingTheme: any) => {
  return StyleSheet.create<OnboardingStyleSheet>({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180,
  }
}

const CustomPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { Assets } = useTheme()
  const { t } = useTranslation()
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Assets.svg.secureImage {...imageDisplayOptions} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={styles.headerText} testID={testIdWithKey('HeaderText')}>
            Keep your wallet secure
          </ThemedText>
          <ThemedText style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
            Protect your device, keep your PIN private, and only accept credentials or connections from sources you trust.
          </ThemedText>
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: string; body: string; devModeListener?: boolean }> = [
  {
    image: CredentialList,
    title: 'Store your credentials',
    body: 'Your digital credentials will appear here after you accept them. You can review details and manage what is stored in your wallet.',
    devModeListener: true,
  },
  {
    image: ScanShare,
    title: 'Scan and share securely',
    body: 'Use the scan feature to receive credential offers, respond to proof requests, and connect with trusted services.',
  },
]

export const createPageWith = (PageImage: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: 'center' }}>{<PageImage style={imageDisplayOptions} />}</View>
      <View style={{ marginBottom: 20 }}>
        <ThemedText style={styles.headerText} testID={testIdWithKey('HeaderText')}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
          {body}
        </ThemedText>
      </View>
    </ScrollView>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  return [
    ...guides.map((g) => createPageWith(g.image, g.title, g.body, OnboardingTheme)),
    CustomPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages
